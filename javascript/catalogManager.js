'use strict'



class BrandNames {

    subj_DOM_elem = document.createElement('div') ;

    containerToSubjectDE = null ;

    


    async getGoodsByModelName (modelName) {

        const url = './php_handlers/getGoodsByModelName.php' ;
        const options = {

            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body: 'modelname=' + modelName ,
        } ;

        return await fetch(url , options).then(result => result.json()).then(data => {
            let display = document.querySelector('#main-content-goods');
            display.innerHTML = '' ;
            data.forEach(elem => {
                console.log(elem);
                let div = document.createElement('div');
                div.innerText = elem.taste ;
                display.append(div);
            });

        }) ;

        // response.json().then(data => {
        //     console.log(data);
        // });

    }

    async getBrandNames () {

        const url = './php_handlers/getGoods.php' ;
        const options = {

            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body: 'type=to_goods' ,
        } ;

        const response = await fetch(url , options) ;

        return response.json() ;

    }



    constructor () {

        this.subj_DOM_elem.className = 'brandNames-container' ;

        let resultData = null ;


        // this.getBrandNames()
        this.getBrandNames().then( data => {
            
            data[1].forEach( elem => {
                const elem_the_a = document.createElement('a');
                elem_the_a.href = '#' ;
                elem_the_a.innerText = elem.modelname ;
                this.subj_DOM_elem.append(elem_the_a);

                elem_the_a.onclick = (e) => {

                    e.preventDefault();

                    // alert();

                    const data = this.getGoodsByModelName(elem.modelname) ;

                    console.log(data);

                }


                // console.log(elem);
            });



        });


        // console.log(resultData);

    }
}


class CatalogManager {

    modules = [] ;


    goodsDisplay = document.querySelector('#main-content-goods');



    constructor (containerToBrandnames) {
        

        this.modules[Symbol.for('brandNames')] = new BrandNames() ;

        containerToBrandnames.append(this.modules[Symbol.for('brandNames')].subj_DOM_elem);



    }
}



export {
    
    CatalogManager,
}