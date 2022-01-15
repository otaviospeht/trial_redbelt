import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Spinner from "react-bootstrap/Spinner";

export const IncidentModal = ({ types, severities, show, item, onHide, readOnly, submit }) => {
    const [formIsLoading, setFormIsLoading] = useState(false);
    const [form, setForm] = useState({...item});
    const handleOnChange = (e) => {
        console.log(form);
        form[e.target.id] = e.target.value;
        setForm(form);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormIsLoading(true);
        Promise
            .resolve(submit(form)).then(handleOnHide)
            .catch(e => {
                setFormIsLoading(false);
            });

        return false;
    }

    const handleOnHide = () => {
        onHide();
        setFormIsLoading(false);
    }

    return (
        <>
            <Modal show={show} size="lg" centered onHide={handleOnHide} onShow={() => setForm({...item})}>
                <Modal.Header closeButton>
                    <Modal.Title>{item ? item.title : (
                        <span>Novo incidente</span>
                        
                    )}</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <Form id="incident-modal-form" onSubmit={handleSubmit}>
                            <>
                                {!readOnly ? (
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control type="text" defaultValue={item ? item.title : ''} onChange={handleOnChange} />
                                    </Form.Group>
                                ) : ''}
                                
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control as="textarea" rows={5} defaultValue={item ? item.description : ''} onChange={handleOnChange} readOnly={readOnly} />
                                </Form.Group>
                                <Row>
                                    <Col xs={12} md={4}>
                                        <Form.Group className="mb-3" controlId="incident_type_id">
                                            <Form.Label>Tipo</Form.Label>
                                            {!readOnly ? (
                                                <Form.Select className="mb-3" aria-label="Tipo do incidente" defaultValue={item ? item.type.id : ''} onChange={handleOnChange}>
                                                    {item ? '' : (<option value="" disabled>Selecione...</option>)}
                                                    {types.map(opt => 
                                                        <option key={`type-${opt.id}`} value={opt.id}>{opt.description}</option>)
                                                    }
                                                </Form.Select>
                                            ) : (
                                                <Form.Control type="text" defaultValue={item ? item.type.description : ''} readOnly={readOnly} />
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Group className="mb-3" controlId="status">
                                            <Form.Label>Status</Form.Label>
                                            {!readOnly ? (
                                                <Form.Select className="mb-3" aria-label="Status do incidente" defaultValue={item ? item.status : ''} onChange={handleOnChange}>
                                                    {item ? '' : (<option value="" disabled>Selecione...</option>)}
                                                    <option value={0}>INATIVO</option>
                                                    <option value={1}>ATIVO</option>
                                                </Form.Select>
                                            ) : (
                                                <Form.Control type="text" defaultValue={item ? (item.status ? 'ATIVO' : 'INATIVO') : ''} onChange={handleOnChange} readOnly={readOnly} />
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={4}>
                                        <Form.Group className="mb-3" controlId="incident_severity_id">
                                            <Form.Label>Criticidade</Form.Label>
                                            {!readOnly ? (
                                                <Form.Select className="mb-3" aria-label="Tipo do incidente" defaultValue={item ? item.type.id : ''} onChange={handleOnChange}>
                                                    {item ? '' : (<option value="" disabled>Selecione...</option>)}
                                                    {severities.map(opt => 
                                                        <option key={`severity-${opt.id}`} style={{color: opt.color}} value={opt.id}>{opt.description}</option>)
                                                    }
                                                </Form.Select>
                                            ) : (
                                                <Form.Control type="text" defaultValue={item ? item.severity.description : ''} readOnly={readOnly} style={item ? {color: item.severity.color} : {}} />
                                            )}
                                        </Form.Group>
                                    </Col>
                                    {!item ? '' : (
                                        <Col xs={12} md={12}>
                                            <div className="text-muted font-10">Criado {(
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip>{item.created_at}</Tooltip>}
                                                >
                                                    <span>{item.human_created_at}</span>
                                                </OverlayTrigger>
                                            )} e atualizado pela última vez {(
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={<Tooltip>{item.updated_at}</Tooltip>}
                                                >
                                                    <span>{item.human_updated_at}</span>
                                                </OverlayTrigger>
                                            )}.</div>
                                        </Col>
                                    )}
                                </Row>
                            </>
                        </Form>
                    </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleOnHide} disabled={formIsLoading}>
                    Fechar
                </Button>
                {readOnly ? '' : (
                    <Button variant="primary" type="submit" form="incident-modal-form" disabled={formIsLoading}>
                        {formIsLoading ? (
                            <>
                                <Spinner animation="border" as="span" role="status" aria-hidden="true" size="sm" />
                                <span className="visually-hidden">Carregando...</span>
                            </>
                        ) : 'Salvar'}
                    </Button>
                )}
                </Modal.Footer>
            </Modal>
        </>
    )
}