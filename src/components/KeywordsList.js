import { Form } from "react-bootstrap"

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

    const handleCheckboxInput = ({ target }) => {
        setFormData(prevData => {
            const copy = { ...prevData }
            let keywordsArr = copy.areasOfInfluence
            if (keywordsArr.includes(target.value)) {
                keywordsArr = keywordsArr.filter(el => el !== target.value)
            } else {
                keywordsArr = [...keywordsArr, target.value]
            }
            return { ...prevData, areasOfInfluence: keywordsArr }
        })
    }

    const renderKeywords = () => {
        return keywords.map(keyword => (
            <Form.Check
                key={keyword}
                type="checkbox"
                label={keyword[0].toUpperCase() + keyword.slice(1)}
                value={keyword}
                onChange={handleCheckboxInput}
                defaultChecked={areasOfInfluence.includes(keyword)}
                reverse
                inline
            />
        ))
    }

    return (
        <Form.Group>
            <div className="mb-3">
                <Form.Text>Please select the areas of influence:</Form.Text>
            </div>
            {renderKeywords()}
        </Form.Group>
    )
}
