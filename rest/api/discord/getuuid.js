const isNumber = require('../../../utils/isnumber.js')

module.exports = (app, pool) => {
  app.get('/api/discord/getuuid', (req, res) => {
    var id = req.query.id
    if(!isNumber(id)) {
      res.send({
        'success': false,
        'uuid': ''
      })
      return
    }

    var escaped = pool.escape(id)
    var query = `SELECT UUID FROM servrlink WHERE ID=${escaped};`
    pool.query(query, (error, result) => {
      if(error) {
        res.send({
          'success': false,
          'uuid': ''
        })
        throw error
      }

      if(result.length == 0) {
        res.send({
          'success': false,
          'uuid': ''
        })
      } else {
        res.send({
          'success': true,
          'uuid': result[0].UUID
        })
      }
    })
  })
}
