# GeoBusca CEP

Atividade Guiada — Integração com APIs GeoBusca CEP.

## Tecnologias

- React + Vite
- Axios
- ViaCEP
- OpenCage Geocoding
- Material UI
- Styled Components
- React Leaflet
- Leaflet
- localStorage

## Como executar

```bash
npm install
```

Crie um arquivo `.env` na raiz:

```env
VITE_OPENCAGE_API_KEY=SUA_CHAVE_DA_OPENCAGE
```

Depois:

```bash
npm run dev
```

Abra o endereço informado pelo Vite no navegador.

## Funcionalidades

- Consulta de endereço por CEP usando ViaCEP.
- Conversão do endereço para latitude/longitude usando OpenCage.
- Exibição do endereço em mapa com OpenStreetMap/Leaflet.
- Cadastro de favoritos.
- Edição do apelido do favorito.
- Exclusão de favoritos.
- Persistência dos favoritos em `localStorage`.

## GitHub

Para a entrega, o repositório deve ser público e ter o nome:

`atividade-guiada-aula-05-frameworks-1`

Não envie o arquivo `.env`, pois ele contém a chave da API.
