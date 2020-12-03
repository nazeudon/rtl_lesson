# Note

- expect で検証するとき、package.json に`--env=jsdom --verbose`を追記すると、テスト名も表示されて分かりやすい。
  - ```json
    "scripts": {
        ...
        ...
        "test": "react-scripts test --env=jsdom --verbose",
        ...
    },
    ```
