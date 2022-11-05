import city_pref from './city_pref.json';

class ParentChildrenPulldown {
 
    constructor(
        private parent_target_name: string, 
        private child_target_name: string,
        private master: Object
    ) {
    }

    add_parent_event_linster() {
        console.log(this.child_target_name);
        console.log(this.master);
        const parent_target_element = document.querySelector(this.parent_target_name)!;
        console.log(parent_target_element);
        parent_target_element.addEventListener('change', (event) => {
            // typeGuardしないと値を取れない
            if ((event.target instanceof HTMLSelectElement)) {
                let parent_value: string = event.target.value;
                let target_parent_selection: string;
                if (this.master.get(parent_value) !== undefined) {
                    target_parent_selection = this.master.get(parent_value)!;
                    console.log(target_parent_selection);
                };
            }
            //const children_element = document.querySelector(this.child_target_name)!;

        });
    }

    
}

const parent_child_pulldown =  new ParentChildrenPulldown(
    'select[name="city"]',
    'select[name="town"]',
    city_pref
);

parent_child_pulldown.add_parent_event_linster();
