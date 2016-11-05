module.exports = {
    "env": {
        "node": true
    },
    //"extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
    },
    "rules": {
        "indent": [
            2,
            4
        ],
        "linebreak-style": [
            2,
            "unix"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "curly": [
            2,
            "all"
        ],
        "camelcase": [
            2,
            {
                "properties": "always"
            }
        ],
        "eqeqeq": [
            2,
            "smart"
        ],
        "one-var-declaration-per-line": [
            2,
            "always"
        ],
        "new-cap": 2
    }
};
