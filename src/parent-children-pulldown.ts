import city_pref from './city_pref.json';

class ParentChildrenPulldown {
 
    constructor(
        private parent_target_name: string, 
        private child_target_name: string,
        private master: object
    ) {
    }

    parent_add_event_linster() {
        const parent_target_element = document.querySelector(this.parent_target_name)!;
        parent_target_element.addEventListener('change', (event) => {
            console.log(event);
        });
        console.log(this.child_target_name);
        console.log(this.master);
    }
}

console.log('倉橋');
console.log(city_pref);
const parent_child_pulldown =  new ParentChildrenPulldown(
    'city',
    'town',
    city_pref
);

parent_child_pulldown.parent_add_event_linster();
