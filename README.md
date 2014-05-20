tty-logger
==========

Logger for debugging via USB-UART adapter.


## Идея

Данное приложение предназначено для удобного представления данных, получаемых через отладочный шнур USB-UART.


## Разработка

### Установка инструментов и зависимостей

Вам необходим [node.js](http://nodejs.org/). Затем установите grunt and bower:

```
$ npm install -g grunt-cli bower
```

### Запуск и отладка

```
$ npm install
$ grunt dist
```

_Нет более необходимости запускать 'bower install', после запуска 'npm install' этот этап будет произведен автоматически._

Вы можете произвести сборку под все поддерживаемые платформы:
```
$ grunt dist --platforms=all
```

### Сборка модуля node-serialport:

Не удалось собрать модуль под node-webkit версии 0.9.2, поэтому пересобрал под 0.8.5:

1. Под рутом:

```
    sudo npm install -g nw-gyp node-pre-gyp
```

2. Зашел в каталог **node_modules/serialport** и выполнил:

```
    nw-gyp configure --target=0.8.5
    #nw-gyp configure --target=v0.9.2
    nw-gyp build
```

Получил ошибку

    ```
        gyp: Undefined variable module_name in binding.gyp
    ```

поэтому выполнил:

```
    node-pre-gyp build --runtime=node-webkit --target=0.8.5
    nw-gyp build
```


Чтобы запустить приложение, необходимо выполнить команду в зависимости от вашей платформы:
```
$ grunt exec:win
$ grunt exec:mac
$ grunt exec:linux32
$ grunt exec:linux64
```
Нажмите F12 чтобы открыть инструменты отладки.
