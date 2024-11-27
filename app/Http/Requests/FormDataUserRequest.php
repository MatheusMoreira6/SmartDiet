<?php

namespace App\Http\Requests;

use App\Libraries\LibConversion;
use App\Libraries\LibValidation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class FormDataUserRequest extends FormRequest
{
    public $stopOnFirstFailure = true;

    public function prepareForValidation(): void
    {
        $this->merge([
            'nome' => trim($this->nome),
            'sobrenome' => trim($this->sobrenome),
            'data_nascimento' => LibConversion::convertBrToIso($this->data_nascimento),
            'questionario_id' => !empty($this->questionario_id) ? (int) $this->questionario_id : null,
            'email' => trim($this->email),
            'password' => trim($this->password),
        ]);
    }

    public function rules(): array
    {
        $rules = [
            'id' => 'prohibited',
            'user_id' => 'prohibited',
            'nutricionista_id' => 'prohibited',
            'nome' => 'required|min:3|max:100',
            'sobrenome' => 'required|min:3|max:100',
            'data_nascimento' => 'required',
            'genero_id' => 'required|exists:generos,id',
            'cpf' => 'required|size:14|unique:pacientes,cpf',
            'telefone' => 'required|size:15',
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'questionario_id' => 'nullable|exists:questionarios,id',
            'email' => 'required|email|unique:users,email',
            'password' => 'nullable|min:6|confirmed',
        ];

        if ($this->isMethod('put')) {
            $paciente = Auth::user()->paciente;

            $rules['cpf'] .= ',' . $paciente->id . ',id';

            $rules['questionario_id'] = 'prohibited';
            $rules['email'] = 'prohibited';
            $rules['password'] = 'prohibited';
        }

        return $rules;
    }

    public function messages(): array
    {
        return [
            'id.prohibited' => 'O campo id é inválido',
            'user_id.prohibited' => 'O campo user_id é inválido',
            'nutricionista_id.prohibited' => 'O campo nutricionista_id é inválido',
            'nome.required' => 'O campo nome é obrigatório',
            'nome.min' => 'O campo nome precisa ter no mínimo 3 caracteres',
            'nome.max' => 'O campo nome deve ter no máximo 100 caracteres',
            'sobrenome.required' => 'O campo sobrenome é obrigatório',
            'sobrenome.min' => 'O campo sobrenome precisa ter no mínimo 3 caracteres',
            'sobrenome.max' => 'O campo sobrenome deve ter no máximo 100 caracteres',
            'data_nascimento.required' => 'O campo data de nascimento é obrigatório',
            'genero_id.required' => 'O campo gênero é obrigatório',
            'genero_id.exists' => 'O gênero é inválido',
            'cpf.required' => 'O campo CPF é obrigatório',
            'cpf.size' => 'O CPF deve ter 14 caracteres',
            'cpf.unique' => 'O CPF já está em uso',
            'telefone.required' => 'O campo telefone é obrigatório',
            'telefone.size' => 'O telefone deve ter 11 números',
            'foto_perfil.image' => 'A foto de perfil deve ser uma imagem',
            'foto_perfil.mimes' => 'A foto de perfil deve ser do tipo jpeg, png ou jpg',
            'foto_perfil.max' => 'A foto de perfil deve ter no máximo 2MB',
            'questionario_id.exists' => 'O questionário é inválido',
            'email.required' => 'O campo email é obrigatório',
            'email.email' => 'O email é inválido',
            'email.unique' => 'O email já está em uso',
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
