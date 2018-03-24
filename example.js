const dNest = require('./src/database-nest.js')

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