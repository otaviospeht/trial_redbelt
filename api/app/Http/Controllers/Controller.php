<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller as BaseController;

/**
 *
 */
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @param \Exception $exception
     * @return JsonResponse
     */
    protected function defaultErrorResponse(\Exception $exception): JsonResponse
    {
        report($exception);

        $message = $exception->getMessage();
        $json = json_decode($message, true);
        $output = $message;
        $code = 500;

        if (is_array($json)) {
            $output = ['errors' => $json];
        }

        if (in_array($exception->getCode(), array_keys(Response::$statusTexts))) {
            $code = $exception->getCode();
        }

        return response()->json($output, $code);
    }
}
