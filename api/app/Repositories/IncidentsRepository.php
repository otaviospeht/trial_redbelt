<?php

namespace App\Repositories;

use App\Http\Resources\IncidentResource;
use App\Http\Resources\IncidentSeverityResource;
use App\Http\Resources\IncidentTypeResource;
use App\Interfaces\ResourceRepositoryInterface;
use App\Models\Incident;
use App\Models\IncidentSeverity;
use App\Models\IncidentType;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class IncidentsRepository implements ResourceRepositoryInterface
{
    /**
     * @return array
     * Retorna todos os registros no banco
     * e suas relações
     */
    public function all(): array
    {
        return [
            'incidents'  => $this->incidents(),
            'types'      => $this->types(),
            'severities' => $this->severities(),
        ];
    }

    /**
     * @return JsonResource
     * Retorna todos os incidentes
     */
    private function incidents(): JsonResource
    {
        return IncidentResource::collection(Incident::with('incidentType', 'incidentSeverity')->get());
    }

    /**
     * @return JsonResource
     * Retorna todos os tipos de incidente
     */
    private function types(): JsonResource
    {
        return IncidentTypeResource::collection(IncidentType::all());
    }

    /**
     * @return JsonResource
     * Retorna todos as criticidades disponíveis
     */
    private function severities(): JsonResource
    {
        return IncidentSeverityResource::collection(IncidentSeverity::all());
    }

    /**
     * @param int $id
     * @return JsonResource
     * Retorna a instância do model com o id informado
     */
    public function find(int $id): JsonResource
    {
        return new IncidentResource(Incident::with('incidentType', 'incidentSeverity')->find($id));
    }

    /**
     * @param array $data
     * @return JsonResource
     * Retorna a instância do model criado
     */
    public function store(array $data): JsonResource
    {
        $incident = Incident::create($data);

        return new IncidentResource($incident);
    }

    /**
     * @param int $id
     * @param array $data
     * @return JsonResource
     * Retorna a instância do model atualizado
     */
    public function update(int $id, array $data): JsonResource
    {
        $incident = Incident::find($id);
        $incident->fill(Arr::except($data, 'id'));
        $incident->save();

        return new IncidentResource($incident);
    }

    /**
     * @param int $id
     * @return bool
     * Retorna se a operação foi bem sucedida (true) ou falhou (false)
     */
    public function destroy(int $id): bool
    {
        return Incident::destroy($id);
    }
}
