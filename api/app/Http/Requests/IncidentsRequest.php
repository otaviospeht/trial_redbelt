<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class IncidentsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return match ($this->getMethod()) {
            'POST' => [
                'title'                => ['required', 'string'],
                'description'          => ['required', 'string'],
                'incident_severity_id' => ['required', 'exists:incident_severities,id'],
                'incident_type_id'     => ['required', 'exists:incident_types,id'],
                'status'               => ['required', 'boolean'],
            ],
            'PUT', 'PATCH' => [
                'id'                   => ['required', 'exists:incidents'],
                'title'                => ['required', 'string'],
                'description'          => ['required', 'string'],
                'incident_severity_id' => ['required', 'exists:incident_severities,id'],
                'incident_type_id'     => ['required', 'exists:incident_types,id'],
                'status'               => ['required', 'boolean'],
            ],
            default => [],
        };
    }
}
