class ApiFeatures {
    constructor(query , queryStr){
        this.query= query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options:"i"
            }

        }:{} 
        this.query= this.query.find({...keyword});
        return this;
    }


    filter(){
        //Copy banaya hai taki original mein changes na ho
        const querycopy = {...this.queryStr};  // Isme actually copy bana , warna referrnce jata normal way mein so original mein chnages ho jata
       
        //Removing some  fields for category
        const removefields=["keyword","page","limit"];

        removefields.forEach(key=>delete querycopy[key]);
    
        
        //Filter for Price and Rating
        let queryStr =JSON.stringify(querycopy);
        queryStr= queryStr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);

        this.query= this.query.find(JSON.parse(queryStr));
        return this;
    }


    pagination(resultperpage){
        const currentpage = Number(this.queryStr.page) || 1;
 
        //Agar 50 product hai , and ek page par 10 product dikhana h , total 5 page banega , agar mai bolu page 2 dikha toh matlab starting 10 skip karke 11 se 20 dikhana h
        const skip = resultperpage * (currentpage-1);

        this.query =this.query.limit(resultperpage).skip(skip);

        return this;

    }



}

module.exports= ApiFeatures;