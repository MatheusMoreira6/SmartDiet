<?php

namespace App\Http\Requests;

use App\Libraries\LibConversion;
use App\Libraries\LibValidation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class FormDataAdminRequest extends FormRequest
{
    public $stopOnFirstFailure = true;

    public function prepareForValidation(): void
    {
        $this->merge([
            'nome' => trim($this->nome),
            'sobrenome' => trim($this->sobrenome),
            'data_nascimento' => LibConversion::convertBrToIso($this->data_nascimento),
            'email' => trim($this->email),
            'password' => trim($this->password),
        ]);
    }

    public function rules(): array
    {
        $rules = [
            'id' => 'prohibited',
            'user_id' => 'prohibited',
            'nome' => 'required|min:3|max:100',
            'sobrenome' => 'required|min:3|max:100',
            'data_nascimento' => 'required',
            'genero_id' => 'required|exists:generos,id',
            'cpf' => 'required|size:14|unique:nutricionistas,cpf',
            'crn' => 'required|size:9|unique:nutricionistas,crn',
            'telefone' => 'required|size:15',
            'telefone_fixo' => 'nullable|size:9',
            'email' => 'email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ];

        if ($this->isMethod('put')) {
            $user = Auth::user();
            $nutricionista = $user->nutricionista;

            $rules['cpf'] .= ',' . $nutricionista->id . ',id';
            $rules['crn'] .= ',' . $nutricionista->id . ',id';
            $rules['email'] .= ',' . $user->id . ',id';

            $rules['password'] = 'nullable|min:6|confirmed';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute precisa ser preenchido',
            'user_id.prohibited' => 'O campo user_id é inválido',
            'nome.min' => 'O campo nome precisa ter no mínimo 3 caracteres',
            'nome.max' => 'O campo nome deve ter no máximo 100 caracteres',
            'sobrenome.min' => 'O campo sobrenome precisa ter no mínimo 3 caracteres',
            'sobrenome.max' => 'O campo sobrenome deve ter no máximo 100 caracteres',
            'data_nascimento' => 'A data de nascimento é obrigatória',
            'genero_id.required' => 'O gênero é obrigatório',
            'genero_id.exists' => 'O gênero é inválido',
            'cpf.size' => 'O CPF deve ter 14 caracteres',
            'cpf.unique' => 'O CPF já está em uso',
            'crn.size' => 'O CRN deve ter 9 caracteres',
            'crn.unique' => 'O CRN já está em uso',
            'telefone.size' => 'O telefone deve ter 11 números',
            'telefone_fixo.size' => 'O telefone fixo deve ter 8 números',
            'email' => 'O email é inválido',
            'email.unique' => 'O email já está em uso',
            'password.required' => 'A senha é obrigatória',
            'password.min' => 'A senha deve ter pelo menos 6 caracteres',
            'password.confirmed' => 'As senhas não conferem',
        ];
    }

    public function after()
    {
        return [
            function (Validator $validator) {
                if ($validator->errors()->isEmpty() && $this->data_nascimento && !LibValidation::validateDateOfBirth($this->data_nascimento)) {
                    $validator->errors()->add('data_nascimento', 'A data de nascimento é inválida.');
                }

                if ($validator->errors()->isEmpty() && $this->cpf && !LibValidation::validateCPF($this->cpf)) {
                    $validator->errors()->add('cpf', 'O CPF é inválido.');
                }
            }
        ];
    }
}
