<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IncidentsRequest;
use App\Repositories\IncidentsRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IncidentsController extends Controller
{
    protected IncidentsRepository $repository;

    public function __construct(IncidentsRepository $incidentsRepository)
    {
        $this->repository = $incidentsRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        try {
            $data = $this->repository->all();

            return new JsonResponse(compact('data'));
        } catch (\Exception $e) {
            return $this->defaultErrorResponse($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param IncidentsRequest $request
     * @return JsonResponse
     */
    public function store(IncidentsRequest $request): JsonResponse
    {
        try {
            $data = $this->repository->store($request->all());

            return new JsonResponse(compact('data'));
        } catch (\Exception $e) {
            return $this->defaultErrorResponse($e);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @param IncidentsRequest $request
     * @return JsonResponse
     */
    public function show(int $id, IncidentsRequest $request): JsonResponse
    {
        try {
            $data = $this->repository->find($id);

            return new JsonResponse(compact('data'));
        } catch (\Exception $e) {
            return $this->defaultErrorResponse($e);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     * @param IncidentsRequest $request
     * @return JsonResponse
     */
    public function update(int $id, IncidentsRequest $request): JsonResponse
    {
        try {
            $data = $this->repository->update($id, $request->all());

            return new JsonResponse(compact('data'));
        } catch (\Exception $e) {
            return $this->defaultErrorResponse($e);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @param IncidentsRequest $request
     * @return JsonResponse
     */
    public function destroy(int $id, IncidentsRequest $request): JsonResponse
    {
        try {
            $data = $this->repository->destroy($id);

            return new JsonResponse(compact('data'));
        } catch (\Exception $e) {
            return $this->defaultErrorResponse($e);
        }
    }
}
