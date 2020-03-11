import { defaultTo } from 'lodash';

/**
 * This function builds stylesheets strings for direct props defined (Like fontmont, cornerRadius, ... )
 * For example, if fontmont is provided in prop like <Comp fontmont> then output will be
 * "font-family:'mont';"
 * @param  {[type]} prop Component prop
 * @return {[type]}      CSS String
 */
function buildCSSStringFromProps(prop) {
    return '';
}

/**
 * Short handler for ${props => props.theme.name} with default value
 * Add px Units if name as "sz" prefix
 * @param  {[type]} name         theme property name
 * @param  {[type]} defaultValue Default Value if not found.
 * @return {function(*): *}              return selector for styled components
 */
function themeProp(name: String, defaultValue) {
    return (props) => {
        // If this means size, add px unit for styled components.
        const val = defaultTo(props.theme[name], defaultValue);
        return ( !isNaN(val) && name.startsWith("sz") ) ? `${val}px` : val;
    }
}
export { buildCSSStringFromProps, themeProp };
