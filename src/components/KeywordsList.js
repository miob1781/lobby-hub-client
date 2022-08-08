export function KeywordsList(props) {
    const {setAreasOfInfluence} = props;

    const handleCheckboxInput = ({target}) => {
        setAreasOfInfluence(prevData => {
            let keywords = [...prevData]
            if (keywords.includes(target.value)){
                keywords = keywords.filter(el => el !== target.value)
            } else {
                console.log("here to push")
                keywords.push(target.value)
            }
            return keywords
        })
    }

    return (
        <div>
            <p>Please select your areas of influence:</p>
            <label>Agriculture: <input
                type="checkbox"
                value="agriculture"
                onChange={handleCheckboxInput}
            /></label>
            <label>Care: <input
                type="checkbox"
                value="care"
                onChange={handleCheckboxInput}
            /></label>
            <label>Defense: <input
                type="checkbox"
                value="defense"
                onChange={handleCheckboxInput}
            /></label>
            <label>Economy: <input
                type="checkbox"
                value="economy"
                onChange={handleCheckboxInput}
            /></label>
            <label>Energy: <input
                type="checkbox"
                value="energy"
                onChange={handleCheckboxInput}
            /></label>
            <label>Environment: <input
                type="checkbox"
                value="environment"
                onChange={handleCheckboxInput}
            /></label>
            <label>Family: <input
                type="checkbox"
                value="family"
                onChange={handleCheckboxInput}
            /></label>
            <label>Finance: <input
                type="checkbox"
                value="finance"
                onChange={handleCheckboxInput}
            /></label>
            <label>Health: <input
                type="checkbox"
                value="health"
                onChange={handleCheckboxInput}
            /></label>
            <label>Housing: <input
                type="checkbox"
                value="housing"
                onChange={handleCheckboxInput}
            /></label>
            <label>Justice: <input
                type="checkbox"
                value="justice"
                onChange={handleCheckboxInput}
            /></label>
            <label>Science: <input
                type="checkbox"
                value="science"
                onChange={handleCheckboxInput}
            /></label>
            <label>Social affairs: <input
                type="checkbox"
                value="social affairs"
                onChange={handleCheckboxInput}
            /></label>
            <label>Tax: <input
                type="checkbox"
                value="tax"
                onChange={handleCheckboxInput}
            /></label>
            <label>Transport: <input
                type="checkbox"
                value="transport"
                onChange={handleCheckboxInput}
            /></label>
        </div>
    )
}