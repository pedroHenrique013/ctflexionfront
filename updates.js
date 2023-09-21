
async function atualizarTime(token, novoTime) {
  const id = extrairIdDoToken(token);

  try {
    const response = await fetch(`http://localhost:3000/users/${id}/update-time-and-stars`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Envia o token no cabeçalho da requisição
      },
      body: JSON.stringify({ time: novoTime }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error('Erro ao atualizar o atributo "time"');
    }
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

function extrairIdDoToken(token) {
  // Lógica para extrair o ID do token JWT
  // Exemplo: supondo que o token esteja no formato 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI...'
  const partesDoToken = token.split(' ');
  const tokenJWT = partesDoToken[1];
  const payloadBase64 = tokenJWT.split('.')[1];
  const payloadDecodificado = atob(payloadBase64);
  const payload = JSON.parse(payloadDecodificado);

  return payload.id; // Supondo que o ID do usuário esteja no payload
}

export { atualizarTime, extrairIdDoToken };


async function atualizarStars(id, novasStars) {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}/update-time-and-stars`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ stars: novasStars }),
    });

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      throw new Error('Erro ao atualizar o atributo "stars"');
    }
  } catch (error) {
    console.error('Erro:', error);
    throw error;
  }
}

export { atualizarStars };
