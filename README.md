# React-date-picker

This is an easy to configure date picker for react.
Style customisation is in development

## Installation

The package can be installed via [npm](https://github.com/npm/cli):

```
npm install react-datepicker --save
```

Or via [yarn](https://github.com/yarnpkg/yarn):

```
yarn add react-datepicker
```

## Configuration

The DatePicker requirest a state containing the UTC string of the date (or an empty string) to work:

```js
const [utcDateString, setUtcDateString] = useState("")

<DatePicker value={utcDateString} onChange={setUtcDateString} />
```
