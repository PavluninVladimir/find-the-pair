# Find the Pair

The application is a SPA.
Player can select one of three difficulties: Easy, Medium or Hard.
Main layout of the application is a grid with different pairs of cards (4x4, 6x6 or 8x8, based on the difficulty level). Cards are shuffled randomly.

# Run
## Develop
* Разработка продукта

        npm run start
* Тестирование

        npm run jest:watch
## Product
* Запуск lint

        npm run lint-js
* Запуск тестирование с покрытием кода

        npm run jest
* Сборка для product

        npm run build
## Docker
* Запуск контейнера

        docker run --rm -d --network="host" find-the-pair:0.1.0
* Сборка для gitLab

        docker build -t registry.gitlab.com/vladimir18/find-the-pair .
* Публикация на gitLab

        docker push registry.gitlab.com/vladimir18/find-the-pair
