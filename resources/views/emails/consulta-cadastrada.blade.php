<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Cadastrada</title>
</head>
<body>
    <h1>Consulta Cadastrada com Sucesso!</h1>
    <p>Olá, {{ $consulta->paciente->nome }}!</p>
    <p>Sua consulta foi cadastrada para o dia {{ \Carbon\Carbon::parse($consulta->data)->format('d/m/Y') }} às {{ \Carbon\Carbon::parse($consulta->hora)->format('H:i') }}.</p>
    <p>Atenciosamente,</p>
    <p><strong>Equipe SmartDiet</strong></p>
</body>
</html>
