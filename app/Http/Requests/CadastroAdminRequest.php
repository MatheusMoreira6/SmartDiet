<?php

namespace App\Http\Requests;

use App\Libraries\LibValidation;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;

class CadastroAdminRequest extends FormRequest
{
    protected $stopOnFirstFailure = true;

    public function authorize(): bool
    {
        return !Auth::check();
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|min:3|max:100',
            'sobrenome' => 'required|min:3|max:100',
            'data_nascimento' => 'required',
            'cpf' => 'required|size:14|unique:nutricionistas,cpf',
            'telefone' => 'required|size:15',
            'email' => 'email|unique:users,email',
            'password' => 'required|min:6|confirmed',
        ];
    }

    public function messages(): array
    {
        return [
            'required' => 'O campo :attribute precisa ser preenchido',
            'nome.min' => 'O campo nome precisa ter no mínimo 3 caracteres',
            'nome.max' => 'O campo nome deve ter no máximo 100 caracteres',
            'sobrenome.min' => 'O campo sobrenome precisa ter no mínimo 3 caracteres',
            'sobrenome.max' => 'O campo sobrenome deve ter no máximo 100 caracteres',
            'data_nascimento' => 'A data de nascimento é obrigatória',
            'cpf.size' => 'O CPF deve ter 14 caracteres',
            'cpf.unique' => 'O CPF já está em uso',
            'telefone.size' => 'O telefone deve ter 15 caracteres',
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
                if ($this->data_nascimento && !LibValidation::validateDateOfBirth($this->data_nascimento, 'd/m/Y')) {
                    $validator->errors()->add('data_nascimento', 'A data de nascimento é inválida.');
                }

                if ($this->cpf && !LibValidation::validateCPF($this->cpf)) {
                    $validator->errors()->add('cpf', 'O CPF é inválido.');
                }
            }
        ];
    }
}
