import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { create, read, update, destroy } from "../../reducer/incidents";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { BiShow } from "react-icons/bi";
import { IncidentModal } from "./components/incidentModal";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Incidents = ( { incidents, types, severities, create, read, update, destroy } ) => {
    const MySwal = withReactContent(Swal)

    const [createModalVisible, setCreateModalVisible] = useState(false);

    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [detailsItem, setDetailsItem] = useState(undefined);
    const showAndSetDetailsModal = (item) => {
        setDetailsItem(item);
        setDetailsModalVisible(true);
    }

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editItem, setEditItem] = useState(undefined);
    const showAndSetEditModal = (item) => {
        setEditItem(item);
        setEditModalVisible(true);
    }

    const showDeleteAlert = (item) => {
        MySwal.fire({
            title: 'Deseja mesmo remover este incidente?',
            html: 'Essa ação não pode ser desfeita.',
            buttonsStyling: false,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Remover',
            customClass: {
                confirmButton: 'btn btn-danger mx-2',
                cancelButton: 'btn btn-secondary mx-2'
            },
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return Promise.resolve(destroy(item.id));
            },
            allowOutsideClick: () => !MySwal.isLoading()
          }).then(res => {
              if (res.isConfirmed) {
                  MySwal.fire({
                      title: res.value ? 'Sucesso!' : 'Ops!',
                      html: res.value ? 'Incidente removido.' : 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
                      icon: res.value ? 'success' : 'warning',
                  })
              }
          });
    }

    useEffect(() => {
        read()
    }, []);

    const header = [
        { title: 'Ações', className: 'text-center', maxWidth: '50px', render: item => (
            <div className="d-flex gap-1 align-items-center justify-content-center">
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 300 }}
                    overlay={<Tooltip>Detalhes</Tooltip>}
                >
                    <div role="button" onClick={() => showAndSetDetailsModal(item)}><BiShow className="text-info"></BiShow></div>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 300 }}
                    overlay={<Tooltip>Alterar</Tooltip>}
                >
                    <div role="button" onClick={() => showAndSetEditModal(item)}><AiFillEdit className="text-warning" /></div>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 150, hide: 300 }}
                    overlay={<Tooltip>Deletar</Tooltip>}
                >
                    <div role="button" onClick={() => showDeleteAlert(item)}><AiFillDelete className="text-danger"></AiFillDelete></div>
                </OverlayTrigger>
            </div>
        ) },
        { title: 'Título', src: 'title' },
        { title: 'Tipo', src: 'type', maxWidth: '100px', className: 'text-center', render: value => value.description },
        { title: 'Status', src: 'status', maxWidth: '100px', className: 'text-center', render: value => value ? 'ATIVO' : 'INATIVO'},
        { title: 'Criticidade', src: 'severity', maxWidth: '100px', className: 'text-center', render: value => {
            return (
                <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>{value.description}</Tooltip>}
                >
                    <div className="d-flex align-items-center justify-content-center" style={{height: '24px'}}>
                        <div style={{backgroundColor: value.color, width: '20px', height: '20px', borderRadius: '50%'}}>&nbsp;</div>
                    </div>
                </OverlayTrigger>
            )
        } },
        { title: 'Criado em', src: 'human_created_at', maxWidth: '100px', className: 'text-center' },
        { title: 'Atualizado em', src: 'human_updated_at', maxWidth: '100px', className: 'text-center' },
    ];

    if (! incidents.length) {
        return (
            <div className="d-flex justify-content-center">
                <div className="d-flex align-items-center">
                    <Spinner className="me-2" animation="grow" />
                    <span>Carregando...</span>
                </div>
            </div>
        )
    }

    return (
        <>
            <IncidentModal
                show={createModalVisible}
                onHide={() => setCreateModalVisible(false)}
                types={types}
                severities={severities}
                submit={create}
            ></IncidentModal>

            <IncidentModal
                show={detailsModalVisible}
                onHide={() => setDetailsModalVisible(false)}
                item={detailsItem}
                types={types}
                severities={severities}
                readOnly
            ></IncidentModal>

            <IncidentModal
                show={editModalVisible}
                onHide={() => setEditModalVisible(false)}
                item={editItem}
                types={types}
                severities={severities}
                submit={update}
            ></IncidentModal>

            <div className="d-flex align-items-center justify-content-end mb-2 w-100">
                <Button variant="outline-success" onClick={() => setCreateModalVisible(true)}>
                        <span>Novo incidente</span>
                </Button>
            </div>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {header.map((item, key) => (
                            <th className={item.className} key={`header-${key}`} style={({...item})}>
                                {item.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {incidents.map(row => (
                        <tr key={row.id}>
                            {header.map((item, key) => (
                                <td key={`row-${row.id}-${key}`} style={({...item})} className={item.className ? item.className : ''} >
                                    {item.render ? item.render(item.src ? row[item.src] : row) : row[item.src]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}

const mapStateToProps = state => ({
    incidents: state.incidentsReducer.incidents,
    types: state.incidentsReducer.types,
    severities: state.incidentsReducer.severities,
});

export default connect(
    mapStateToProps,
    { create, read, update, destroy }
)(Incidents);