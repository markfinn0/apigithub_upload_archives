
  import React, { useState } from 'react';

const GitHubUploader = () => {
  // Estados para armazenar o conteúdo do Markdown e a mensagem de status
  const [markdown, setMarkdown] = useState('');
  const [message, setMessage] = useState('');

  // Configurações do GitHub
  const GITHUB_TOKEN = "";
  const REPO_OWNER = 'markfinn0';
  const REPO_NAME = 'mardown_via_api';
  const FOLDER_NAME = 'minha-pasta';
  const FILE_NAME = 'meu-arquivo.md';
  const FILE_PATH = `${FOLDER_NAME}/${FILE_NAME}`;
  const BRANCH_BASE = 'main';

  // URL da API do GitHub
  const CONTENTS_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  // Função para enviar o arquivo Markdown para o GitHub
  const uploadFile = async () => {
    try {
      const content = btoa(unescape(encodeURIComponent(markdown)));
      const commitMessage = 'Upload de arquivo Markdown via API';

      // Faz a requisição PUT usando fetch
      const response = await fetch(CONTENTS_URL, {
        method: 'PUT',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: commitMessage,
          content: content,
          branch: BRANCH_BASE,
        }),
      });

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        const data = await response.json();
        setMessage('Arquivo Markdown enviado com sucesso!');
        console.log('Resposta do GitHub:', data);
      } else {
        const errorData = await response.json();
        setMessage('Erro ao enviar o arquivo Markdown.');
        console.error('Erro:', errorData);
      }
    } catch (error) {
      setMessage('Erro ao enviar o arquivo Markdown.');
      console.error('Erro:', error);
    }
  };

  return (
    <div>
      <h2>Upload de Markdown</h2>
      <textarea
        rows={10}
        cols={50}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Digite seu Markdown aqui..."
      ></textarea>
      <br />
      <button onClick={uploadFile}>Enviar para GitHub</button>
      <p>{message}</p>
    </div>
  );
};

export default GitHubUploader;