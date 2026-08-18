<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public function index(Request $request)
    {
        $query = Service::query();

        if ($request->has('libelle')) {
            $query->where('libelle', 'like', '%' . $request->libelle . '%');
        }

        if (! $request->user() || ! $request->user()->isGestionnaire()) {
            $query->where('actif', true);
        }

        return response()->json($query->get());
    }

    public function show(Service $service)
    {
        return response()->json($service);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'required|string|max:255',
            'prix_unitaire' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $service = Service::create($validator->validated());

        return response()->json($service, 201);
    }

    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'libelle' => 'sometimes|required|string|max:255',
            'prix_unitaire' => 'sometimes|required|numeric|min:0',
            'description' => 'nullable|string',
            'actif' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $service->update($validator->validated());

        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(['message' => 'Service supprimé']);
    }

    public function archiver(Service $service)
    {
        $service->update(['actif' => false]);

        return response()->json($service);
    }
}
