# <div align="center">Social Network</div>
![](readmeAssets/AppScreen.jpg)

## Description

This is unfinished social network  created with React + Typescript + Redux, Redux-thunk, React-router-dom, React-hook-form, axios, classnames, Jest, Websocket.  
The available features are authorization, profile page and profile editing, users search page and chat.  
 **Please note that server owner didn't provide any test user accounts for a complete experience of the app by the third parties. My private account was used.**
***
Проект социальной сети, написанный на базе React + Typescript с использованием Redux, Redux-thunk, React-router-dom, React-hook-form, axios, classnames, Jest, Websocket.  
Реализованы авторизация, редактирование профиля, поиск пользователей и чат(на данный момент этот максимум функциональности, предоставленной владельцем сервера).  
**Пожалуйста, учтите, что владелец сервера не предоставил тестовый аккаунт для полноценной проверки работоспособности приложения сторонними лицами. Использовался личный аккаунт.**

![](readmeAssets/SocialNetworkFunc.gif)


Авторизация пользователя реализована с использованием капчи и выведением сообщения от сервера в случае ошибки в логине/пароле.  
Страница профиля: Редактирование профиля представляет собой модальное окно. Редактирование полей реализовано с помощью react-hook-form; также на фронте выводятся сообщения от сервера об ошибках при валидации определенных полей. Есть возможность поменять фото профиля и добавить статус.  
Чат реализован с использованием Websocket. Открывается и устанавливается соединение при нажатии на кнопку Open Chat. Можно перейти на профиль пользователя.  
Поиск пользователей: Реализована пагинация, есть возможность подписки/отписки,  фильтрация юзеров по никнейму/подписке. Можно перейти на профиль пользователя.  


