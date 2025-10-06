O site oficial do React Native é:
👉 https://reactnative.dev


Aplicativo Mobile

✅ Definição:
Programa desenvolvido para rodar diretamente em dispositivos móveis (Android ou iOS).

🔹 Características:

Instalação: Precisa ser baixado de uma loja (Google Play / App Store).

Acesso: Funciona de forma independente do navegador.

Recursos nativos: Pode acessar câmera, GPS, notificações push, contatos, Bluetooth etc.

Desempenho: Geralmente mais rápido, porque é executado de forma mais próxima ao sistema operacional.

Exemplo de uso: WhatsApp, Instagram, Uber.

💻 Aplicação Web

✅ Definição:
Sistema ou site acessado através de um navegador (Chrome, Firefox, Edge etc.), sem precisar instalar.

🔹 Características:

Instalação: Não precisa ser instalado, basta acessar via URL.

Acesso: Necessita de navegador e (na maioria dos casos) conexão com internet.

Recursos nativos: Acesso limitado a hardware do dispositivo (câmera e localização só com permissão do navegador).

Desempenho: Depende do navegador e da conexão; pode ser mais lento em recursos gráficos.

Exemplo de uso: Gmail (versão web), Facebook pelo navegador, sistemas de gestão online.


REACT
O que é: Uma biblioteca JavaScript criada pelo Facebook para construir interfaces de usuário web.

Onde roda: No navegador (web).

Componentes principais: Usa elementos HTML (div, span, h1, etc.) combinados com CSS.

Renderização: Gera DOM virtual que depois atualiza o DOM real do navegador.


React Native

O que é: Um framework também criado pelo Facebook, baseado no React, mas voltado para construir aplicativos móveis nativos (Android e iOS).

Onde roda: Em dispositivos móveis.

Componentes principais: Não usa HTML ou CSS puro, mas sim componentes próprios como View, Text, Image, Button.

Renderização: Converte os componentes React Native em componentes nativos reais do Android/iOS.

Estilos: Usa StyleSheet com propriedades parecidas com CSS, mas adaptadas ao ambiente mobile.



npx create-expo-app@latest exemploApp

npx expo start

Configurar outra porta:
npx expo start --port 19007

configurando página de teste
--criar uma página em app/tabs/teste.js
http://localhost:19007/test


NPM
Criar diretório
C:\Users\Karanba\AppData\Roaming\npm
mkdir "C:\Users\Karanba\AppData\Roaming\npm"

LIMPAR CACHE
npm cache clean --force

Rodar novamente
npx create-expo-app@latest meuApp

Alternativa
npm install -g create-expo-app
create-expo-app meuApp