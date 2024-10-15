<?php

namespace App\Libraries;

class LibConversion
{
    // Converte de formato ISO (YYYY-MM-DD) para o formato BR (DD/MM/YYYY)
    public static function convertIsoToBr($date)
    {
        // Verifica se a data já está no formato BR (DD/MM/YYYY)
        if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $date)) {
            return $date;
        }

        // Verifica se a data está no formato ISO (YYYY-MM-DD)
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            $parts = explode('-', $date);
            return $parts[2] . '/' . $parts[1] . '/' . $parts[0];
        }

        return $date; // Retorna a data sem modificação se não corresponder a nenhum formato
    }

    // Converte de formato BR (DD/MM/YYYY) para o formato ISO (YYYY-MM-DD)
    public static function convertBrToIso($date)
    {
        // Verifica se a data já está no formato ISO (YYYY-MM-DD)
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            return $date;
        }

        // Verifica se a data está no formato BR (DD/MM/YYYY)
        if (preg_match('/^\d{2}\/\d{2}\/\d{4}$/', $date)) {
            $parts = explode('/', $date);
            return $parts[2] . '-' . $parts[1] . '-' . $parts[0];
        }

        return $date; // Retorna a data sem modificação se não corresponder a nenhum formato
    }
}
