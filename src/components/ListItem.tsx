import styles from '../styles/Home.module.scss';
import { Item } from '../types/item';
import { useState } from 'react';

type Props = {
    item: Item;
}

export const ListItem = ( { item }: Props) => {
    const [isChecked, setIsChecked] = useState(item.done);
    return(
        <div className={styles.Item}>
            <input 
                type="checkbox" 
                checked={isChecked}
                onChange={e => setIsChecked(e.target.checked)}
            />
            <label>{item.name}</label>
            

        </div>
    );
}
