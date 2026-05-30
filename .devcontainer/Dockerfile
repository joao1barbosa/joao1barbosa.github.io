# Node 20 LTS — satisfaz "engines.node >= 20" do Docusaurus.
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bullseye

# yarn já vem na imagem base; corepack garante a versão correta.
RUN corepack enable

# Dependências são instaladas via postCreateCommand (yarn install),
# pois o package.json/yarn.lock só existe no workspace montado, não na imagem.
