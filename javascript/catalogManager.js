'use strict'



class GoodCardPreview {

    subj_DOM_elem = document.createElement('div') ;

    title = null ;
    description = null ;
    description_full = null ;

    img = null ;

    constructor ({title , description , description_full , imgSrc}) {

        class Img {

            createSDE (className = '' , secondClassName = '') {

                const newSde = document.createElement('img');
                newSde.className = className ;
                newSde.classList.add(secondClassName);

                return newSde ;
            }

            subj_DOM_elem = null ;

            src = '' ;

            constructor (src , className1 , className2) {

                this.src = src ;

                this.subj_DOM_elem = this.createSDE(className1 , className2);

                this.subj_DOM_elem.src = this.src ;

            }
        }

        class Item {

            subj_DOM_elem = null ;

            text = '' ;

            createSDE (className = '' , secondClassName = '') {

                const newSde = document.createElement('div');
                newSde.className = className ;
                newSde.classList.add(secondClassName);

                return newSde ;
            }

            constructor (text , className1 , className2) {

                this.subj_DOM_elem = this.createSDE(className1 , className2) ;
                this.text = text ;
                this.subj_DOM_elem.innerText = this.text ;
            }
        }
    
        this.subj_DOM_elem.className = 'goodCard-preview' ;

        const divPrefab = document.createElement('div') ;
        divPrefab.className = 'goog-item' ;

        

        this.title = new Item (title , 'goodItem' , 'goodItem-title') ;

        this.description = new Item (description , 'goodItem' , 'goodItem-description') ;

        this.description_full = new Item (description_full , 'goodItem' , 'goodItem-description-full') ;

        this.img = new Img (imgSrc , 'goodItem' , 'goodItem-description-full');


        this.subj_DOM_elem.append(this.title.subj_DOM_elem , this.description.subj_DOM_elem , this.description_full.subj_DOM_elem , this.img.subj_DOM_elem) ;
    }
}



class BrandNames {

    subj_DOM_elem = document.createElement('div') ;

    containerToSubjectDE = null ;

    async getGoodsByModelName (modelName) {
  
        const url = 'http://localhost/php_handlers/getGoodsByModelName.php' ;
        const options = {
            
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
            body: 'modelname=' + modelName ,
        } ;

        console.log(options);
        
        await fetch(url , options).then(result => {

            return result.json()  ;

        }).then(data => {
            
            let display = document.querySelector('#main-content-goods');
            display.innerHTML = '' ;
            
            data.forEach(elem => {

                const cardPreview = new GoodCardPreview ({title: elem.modelname , description:elem.title , description_full:elem.description , imgSrc: elem.src}) ;



                console.log(elem);
                let div = document.createElement('div');


                div.append(cardPreview.subj_DOM_elem);
                // div.innerText = elem.taste ;
                display.append(div);




            });
            
            return data ;
            
        }) ;

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

        this.getBrandNames().then( data => {
            
            data[1].forEach( elem => {
                const elem_the_a = document.createElement('a');
                elem_the_a.href = '#' ;
                elem_the_a.innerText = elem.modelname ;
                this.subj_DOM_elem.append(elem_the_a);
                
                elem_the_a.onclick = (e) => {
                    
                    e.preventDefault();

                    const data = this.getGoodsByModelName(elem.modelname) ;
                }
            });
        });
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