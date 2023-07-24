import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TagElem from '../../components/TagElem';
import { SUBCRITERIA_TYPE, SCAN_TYPE } from '../../utils/constants'
import './style.css';

function SubCriteria() {
    const location = useLocation();
    let scanElem = location.state.scanElem;

    /**
     * This function is reponsible for getting the default value Or the first value from the criteria value.
     * @param {*} index 
     * @param {*} key 
     * @param {*} value 
     * @returns 
     */
    function getLinkFragmentElment(index, key, value) {
        let link_val = "";
        if (value.type === SCAN_TYPE.INDICATOR) {
            link_val = value.default_value || "";
        } else if (value.type === SCAN_TYPE.VALUE) {
            link_val = value.values[0] || ""
        }
        return (
            <Link key={index + key} to="/variableinfo" state={{ key: key, variableInfo: value }}>
                <strong>({link_val})</strong>
            </Link>
        )
    }


    /**
     * This function is reponsible for dynamically parsing the `type = variable` to replace the keys with React Link element
     * @param {*} text 
     * @param {*} variableObj 
     * @returns 
     */
    function getVariableElemenet(text, variableObj) {
        let resultStr = [];
        for (let [key, value] of Object.entries(variableObj)) {
            const originalString = text;
            const substringToReplace = key;
            // Split the originalString by the substringToReplace
            const parts = originalString.split(substringToReplace);
            // Map each part to either the original substring or the React element
            const elements = parts.map((part, index) => {
                if (index === parts.length - 1) {
                    return part; // Keep the last part unchanged
                } else {
                    return (
                        <React.Fragment key={index + key}>
                            {part}
                            {getLinkFragmentElment(index, key, value)}
                        </React.Fragment>
                    );
                }
            });

            if (Object.entries(variableObj).length > 1) {
                text = elements[1];
                resultStr.push(elements[0])
            } else {
                resultStr.push(elements)
            }
        }
        return resultStr;
    }


    /**
     * Return mapped element for the criteria parameter
     * @param {*} scanElem 
     * @returns 
     */
    function getCriteriaSection(scanElem) {
        return (
            <div className="body-section default-text">
                {scanElem.criteria.map((elem, idx) => {
                    switch (elem.type) {
                        case SUBCRITERIA_TYPE.VARIABLE:
                            return (
                                <p key={idx}>{getVariableElemenet(elem.text, elem.variable)}</p>
                            )
                        case SUBCRITERIA_TYPE.PLAIN_TEXT:
                        default: return (
                            <div key={idx}>
                                <p>{elem.text}</p>
                                {idx !== scanElem.criteria.length - 1 && <small>And</small>}
                            </div>
                        )
                    }

                })}
            </div>
        )
    }

    return (
        <div className="scan-section">
            <div className="header-section">
                <div className="default-text">{scanElem.name}</div>
                <TagElem elem={scanElem} />
            </div>
            {getCriteriaSection(scanElem)}
        </div>
    );
}

export default SubCriteria;