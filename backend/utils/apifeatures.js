class ApiFeatures {
//-------------constructor for query------------
    constructor(query,queryStr){
        //this.query = product.find()
        this.query = query;
        this.queryStr = queryStr;
    }

//------------------search feature-------------------
    search(){
        //getting the exact keyword from query string which user typed 
        const keyword = this.queryStr.keyword ? {
            name:{
                //regex = regular expression is a feature of mongodb
                $regex: this.queryStr.keyword,
                // i = case insensitive values are also searched
                $options:"i",
            },
        }: {};

        //now manipulatind find() which is our query according to our choice of keyword
        this.query = this.query.find({...keyword});
        return this;
    }

//-----------------filter feature-------------------
    filter(){
        const queryCopy = {...this.queryStr}

        //Removing some fields for category
        const removeFields = ["keyword","page","limit"];

        removeFields.forEach(key => delete queryCopy[key]);

        //Filter for Price range and Rating
        let queryStr = JSON.stringify(queryCopy);
        // gt = greaterthan 
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key=>`$${key}`)

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

///---------------------Pagination-------------------
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
            //skip products for every page ex- page 2 doesnt have products of page 1 so skip is 10 products
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }

}

module.exports = ApiFeatures;