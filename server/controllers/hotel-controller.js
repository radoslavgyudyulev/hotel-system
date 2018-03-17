const Hotel = require('../data/Hotel')
const errorHandler = require('../utilities/error-handler')

module.exports = {
   
    getHotel: (req, res) => {
        res.render('hotels/add-hotel')
    },
    addHotel: (req, res) => {
        let reqBody = req.body
        let userId = req.user._id

        

        Hotel
            .create({
                hotelName: reqBody.hotelName, 
                description: reqBody.description,
                _creator: userId,
                image: reqBody.image,
                location: reqBody.location,
                stars: reqBody.stars * 20 + '%'
            })
            .then(hotel => {
                res.redirect('/hotels/all');
            })
            .catch(err => {
                let message = errorHandler.handleMongooseError(err)
                res.locals.globalError = message
                res.render('hotels/add-hotel');
            })
    },
    allHotels: (req, res) => {
       let pageSize = 3
       let page = parseInt(req.query.page) || 1
       let search = req.query.search
       
        
      
       let query = Hotel.find({})

       if (search) {
           query = query.where('location').regex(new RegExp(search, 'i'))
       }

            query             
                 .sort('-postedOn')
                 .skip((page - 1) * pageSize)
                 .limit(pageSize)
                 .then(hotels => {
                     res.render('hotels/all-hotels', {
                        hotels: hotels,
                        hasPrevPage: page > 1,
                        hasNextPage: hotels.length > 0,
                        prevPage: page - 1,
                        nextPage: page + 1,
                        search: search
                                              
                     })
                     
                 })
    },
}
