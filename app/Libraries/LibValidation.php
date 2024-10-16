<?php

namespace App\Libraries;

class LibValidation
{
    public static function validateDateOfBirth($date, $format = 'Y-m-d')
    {
        // Cria um objeto DateTime a partir do formato e data fornecidos
        $d = \DateTime::createFromFormat($format, $date);

        $maxDate = new \DateTime();
        $minDate = (new \DateTime())->modify('-120 years');

        // Verifica se a data é válida e está no intervalo permitido
        return $d && $d->format($format) === $date && $d > $minDate && $d < $maxDate;
    }

    public static function validateCPF($cpf)
    {
        // Remove caracteres não numéricos
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        // Verifica se o CPF tem 11 dígitos
        if (strlen($cpf) != 11) {
            return false;
        }

        // Validação dos dígitos verificadores
        for ($i = 0; $i < 10; $i++) {
            // Verifica se todos os dígitos são iguais
            if (str_repeat($i, 11) === $cpf) {
                return false; // CPF com todos os dígitos iguais
            }
        }

        // Calcula o primeiro dígito verificador
        $sum1 = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum1 += $cpf[$i] * (10 - $i);
        }
        $digit1 = ($sum1 * 10) % 11;
        $digit1 = ($digit1 === 10) ? 0 : $digit1;

        // Verifica o primeiro dígito verificador
        if ($cpf[9] != $digit1) {
            return false;
        }

        // Calcula o segundo dígito verificador
        $sum2 = 0;
        for ($i = 0; $i < 10; $i++) {
            $sum2 += $cpf[$i] * (11 - $i);
        }
        $digit2 = ($sum2 * 10) % 11;
        $digit2 = ($digit2 === 10) ? 0 : $digit2;

        // Verifica o segundo dígito verificador
        return $cpf[10] == $digit2;
    }
}
