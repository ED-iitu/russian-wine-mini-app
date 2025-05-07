FROM ubuntu:20.04

# Устанавливаем необходимые зависимости
RUN apt-get update && apt-get install -y \
    curl \
    gnupg2 \
    lsb-release \
    ca-certificates

# Добавляем репозиторий NodeSource для установки Node.js 22.x
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash

# Устанавливаем Node.js 22.15.0
RUN apt-get install -y nodejs=22.15.0-1nodesource1

# Проверяем версию Node.js
RUN node -v

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы в контейнер
COPY . .

# Устанавливаем зависимости
RUN npm install

# Запускаем приложение
CMD ["npm", "run", "dev"]
