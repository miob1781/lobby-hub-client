const keywords = [
    "agriculture",
    "care",
    "defense",
    "economy",
    "education",
    "energy",
    "environment",
    "family",
    "finance",
    "foreign",
    "health",
    "housing",
    "justice",
    "science",
    "social affairs",
    "tax",
    "transport"
]

export function KeywordsList(props) {
    const { areasOfInfluence, setFormData } = props;

    const handleCheckboxInput = ({target}) => {
        setFormData(prevData => {
            const copy = {...prevData}
            let keywordsArr = copy.areasOfInfluence
            if (keywordsArr.includes(target.value)) {
                keywordsArr = keywordsArr.filter(el => el !== target.value)
            } else {
                keywordsArr = [...keywordsArr, target.value]
            }
            return {...prevData, areasOfInfluence: keywordsArr}
        })
    }

    const renderKeywords = () => {
        return keywords.map(keyword => (
            <div key={keyword}>
                <label>{keyword[0].toUpperCase() + keyword.slice(1)}: <input
                    type="checkbox"
                    value={keyword}
                    onChange={handleCheckboxInput}
                    defaultChecked={areasOfInfluence.includes(keyword)}
                    /></label>
            </div>
        ))
    }
    
    return (
        <div>
            <p>Please select areas of influence:</p>
            {renderKeywords()}
        </div>
    )
}
