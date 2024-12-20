import {
    Accordion,
    ListGroup,
    Badge,
    Form,
    InputGroup,
    Row,
    Col,
} from "react-bootstrap";
import { Apple } from "react-bootstrap-icons";
import { LuLeaf } from "react-icons/lu";
import { RiSeedlingFill } from "react-icons/ri";
import { IoFishSharp } from "react-icons/io5";
import { LuDrumstick } from "react-icons/lu";
import { IoMdNutrition } from "react-icons/io";
import { GiJellyBeans } from "react-icons/gi";
import { PiCheeseBold } from "react-icons/pi";

const RenderAlimentos = ({
    alimentos,
    handleSelectAlimento,
    selectedAlimentos,
    handlePorcaoId,
}) => {
    const getIconByType = (type) => {
        switch (type) {
            case "fruto":
                return <Apple color="#FF6347" />;
            case "grão":
                return <RiSeedlingFill color="#32CD32" />;
            case "proteina_animal":
                return <LuDrumstick color="#FFA07A" />;
            case "vegetal":
                return <IoMdNutrition color="#ebbb1e" />;
            case "oleaginosa":
                return <LuLeaf color="#98FB98" />;
            case "leguminosa":
                return <GiJellyBeans color="brown" />;
            case "laticínio":
                return <PiCheeseBold color="#f0f331" />;
            default:
                return <IoFishSharp color="#1E90FF" />;
        }
    };

    return (
        <Accordion>
            {Object.entries(alimentos).map(([tipo, listaAlimentos]) => (
                <Accordion.Item eventKey={tipo} key={tipo}>
                    <Accordion.Header>
                        {getIconByType(tipo)} &nbsp;
                        <span style={{ fontWeight: "bold", color: "#555" }}>
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                        </span>
                    </Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {listaAlimentos.map((alimento) => (
                                <ListGroup.Item
                                    key={alimento.id}
                                    active={selectedAlimentos.some(
                                        (item) => item.id === alimento.id
                                    )}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        padding: "10px 15px",
                                    }}
                                >
                                    <Form.Check
                                        defaultChecked={selectedAlimentos.some(
                                            (item) => item.id === alimento.id
                                        )}
                                        onClick={() =>
                                            handleSelectAlimento(alimento.id)
                                        }
                                        type="switch"
                                        id={alimento.id}
                                    />
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            width: "100%",
                                        }}
                                    >
                                        <span>{alimento.nome}</span>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text>
                                            Gramas
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            onChange={(e) => {
                                                handlePorcaoId(
                                                    alimento.id,
                                                    e.target.value
                                                );
                                            }}
                                        ></Form.Control>
                                        <InputGroup.Text>G</InputGroup.Text>
                                    </InputGroup>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};

export default RenderAlimentos;
