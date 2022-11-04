import city_pref from './city_pref.json';

class ParentChildrenPulldown {
 
    constructor(
        private parent_target_name: string, 
        private child_target_name: string,
        private master: object
    ) {
    }

    add_parent_event_linster() {
        console.log(this.master);
        const parent_target_element = document.querySelector(this.parent_target_name)!;
        parent_target_element.addEventListener('change', (event) => {
            const target_selector = event!.target;
            const value = target_selector!.value;
            console.log(value)
            const children_element = document.querySelector(this.child_target_name)!;
            console.log(children_element);
        });
    }

    
}

const parent_child_pulldown =  new ParentChildrenPulldown(
    'select[name="city"]',
    'select[name="town"]',
    city_pref
);

parent_child_pulldown.add_parent_event_linster();
