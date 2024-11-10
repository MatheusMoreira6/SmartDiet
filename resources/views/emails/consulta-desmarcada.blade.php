<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Consulta Desmarcada</title>
</head>
<body>
    <h1>Consulta Desmarcada!</h1>
    <p>Olá, {{ $consulta->paciente->nome }}!</p>
    <p>Sua consulta do dia {{ \Carbon\Carbon::parse($consulta->data)->format('d/m/Y') }} às {{ \Carbon\Carbon::parse($consulta->hora)->format('H:i') }} foi desmarcada.</p>
    <p>Atenciosamente,</p>
    <p><strong>Equipe SmartDiet</strong></p>
</body>
</html>
