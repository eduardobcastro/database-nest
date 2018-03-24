# database-nest
Removes duplicated values by grouping unchanged keys and storing details in arrays.

## Installation
```
npm install database-nest
```
## Usage
PS: data must be ordered by group definitions
```javascript
const dNest = require('database-nest')

var list = [
    { country_id: 'BR', country_name: 'Brasil', state_id: 'RJ', city: '1', product: 'a', value: 1 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'RJ', city: '2', product: 'a', value: 2 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'RJ', city: '3', product: 'b', value: 3 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'SP', city: '4', product: 'a', value: 3 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'SP', city: '4', product: 'b', value: 4 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'SP', city: '4', product: 'a', value: 2 },
    { country_id: 'BR', country_name: 'Brasil', state_id: 'SP', city: '5', product: 'b', value: 5 },
    { country_id: 'US', country_name: 'United States', state_id: 'AZ', city: '6', product: 'a', value: 1 },
    { country_id: 'US', country_name: 'United States', state_id: 'AZ', city: '6', product: 'c', value: 7 },
    { country_id: 'US', country_name: 'United States', state_id: 'TX', city: '7', product: 'c', value: 6 }
]
  
let groups = [
  {
    by: 'country_id',
    create: x => ({ id: x.country_id, name: x.country_name }),
    children: 'states'
  },
  {
    by: 'state_id',
    create: x => ({ id: x.state_id }),
    children: 'cities'
  },
  {
    by: 'city',
    create: x => ({ id: x.city }),
    children: 'details'
  },
  {
    create: x => ({ product: x.product, value: x.value })
  }
]

let grouped = dNest.nest(list, groups)
console.log(JSON.stringify(grouped))
```
### Expected outuput
```json
[{
  "id": "BR",
  "name": "Brasil",
  "states": [{
    "id": "RJ",
    "cities": [{
      "id": "1",
      "details": [{
        "product": "a",
        "value": 1
      }]
    }, {
      "id": "2",
      "details": [{
        "product": "a",
        "value": 2
      }]
    }, {
      "id": "3",
      "details": [{
        "product": "b",
        "value": 3
      }]
    }]
  }, {
    "id": "SP",
    "cities": [{
      "id": "4",
      "details": [{
        "product": "a",
        "value": 3
      }, {
        "product": "b",
        "value": 4
      }, {
        "product": "a",
        "value": 2
      }]
    }, {
      "id": "5",
      "details": [{
        "product": "b",
        "value": 5
      }]
    }]
  }]
}, {
  "id": "US",
  "name": "United States",
  "states": [{
    "id": "AZ",
    "cities": [{
      "id": "6",
      "details": [{
        "product": "a",
        "value": 1
      }, {
        "product": "c",
        "value": 7
      }]
    }]
  }, {
    "id": "TX",
    "cities": [{
      "id": "7",
      "details": [{
        "product": "c",
        "value": 6
      }]
    }]
  }]
}]
```