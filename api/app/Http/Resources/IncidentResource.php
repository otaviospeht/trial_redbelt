<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IncidentResource extends JsonResource
{
    /**
     * Indicates if the resource's collection keys should be preserved.
     *
     * @var bool
     */
    public bool $preserveKeys = true;

    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id'                   => $this->id,
            'title'                => $this->title,
            'description'          => $this->description,
            'incident_type_id'     => $this->incidentType->id,
            'incident_severity_id' => $this->incidentSeverity->id,
            'type'                 => $this->incidentType,
            'severity'             => $this->incidentSeverity,
            'status'               => $this->status,
            'created_at'           => $this->created_at->format('d/m/Y H:i:s'),
            'updated_at'           => $this->updated_at->format('d/m/Y H:i:s'),
            'human_created_at'     => $this->created_at->locale('pt-BR')->diffForHumans(),
            'human_updated_at'     => $this->updated_at->locale('pt-BR')->diffForHumans(),
        ];
    }
}
