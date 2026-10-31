import crypto from "node:crypto";

function validarDispositivo(req, res, next) {
    const tokenRecebido = req.headers["x-device-token"];
    const tokenCorreto = process.env.CATRACA_API_KEY;

    if (!tokenCorreto) {
        return res.status(500).json({
            message: "Chave do dispositivo não configurada."
        });
    }

    if (!tokenRecebido) {
        return res.status(401).json({
            message: "Dispositivo não autenticado."
        });
    }

    const recebido = Buffer.from(tokenRecebido);
    const correto = Buffer.from(tokenCorreto);

    if (
        recebido.length !== correto.length ||
        !crypto.timingSafeEqual(recebido, correto)
    ) {
        return res.status(403).json({
            message: "Chave do dispositivo inválida."
        });
    }

    next();
}

export default validarDispositivo;