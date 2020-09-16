import React, { useRef, useEffect } from 'react';
import LoadingHud from './Hud';
import { useStores } from '../../hooks/Utils';
import { autorun } from 'mobx';
import {observer} from 'mobx-react';

/**
 * [MobX based HUD]
 * Will support later.
 * @param {[type]} props [description]
 */
const Hud = props => {
    const ref = useRef();
    const { hud } = useStores();

    useEffect(
        () => autorun(
            () => {
                if (hud.isVisible) {
                    ref.current.show(hud.message);
                } else {
                    ref.current.close();
                }
            }
        )
        ,[ hud.isVisible, hud.message ]
    );

    return (
        <LoadingHud ref={node => ref.current = node } />
    )
};

export default observer(Hud);
