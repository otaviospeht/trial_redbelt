<?php

namespace App\Interfaces;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * Interface ResourceRepositoryInterface
 */
interface ResourceRepositoryInterface {
    /**
     * @return array
     * Retorna todos os registros no banco
     * e suas relações
     */
    public function all(): array;

    /**
     * @param int $id
     * @return JsonResource
     * Retorna a instância do model com o id informado
     */
    public function find(int $id): JsonResource;

    /**
     * @param array $data
     * @return JsonResource
     * Retorna a instância do model criado
     */
    public function store(array $data): JsonResource;

    /**
     * @param int $id
     * @param array $data
     * @return JsonResource
     * Retorna a instância do model atualizado
     */
    public function update(int $id, array $data): JsonResource;

    /**
     * @param int $id
     * @return bool
     * Retorna se a operação foi bem sucedida (true) ou falhou (false)
     */
    public function destroy(int $id): bool;
}
