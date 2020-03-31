<?php
namespace App\Utils;

class Utils {

    /**
     * Method retourning sorting info according to an user input.
     * @param: string $in Column on which the user want to sort.
     * @return: array Ex: ['col' => 'real_col_name', 'order' => ('asc'|'desc')].
     */
    public static function getSortColumn(string $in): array {
        $in = preg_replace('/[^a-z]/', '', strtolower($in));
        $out = ['col' => 'name', 'order' => 'asc'];

        if ($in === 'nom') {
            $out = ['col' => 'name', 'order' => 'asc'];
        } else if ($in === 'ville') {
            $out = ['col' => 'city', 'order' => 'asc'];
        } else if ($in === 'plusrecent') {
            $out = ['col' => 'created_at', 'order' => 'desc'];
        } else if ($in === 'livraison') {
            $out = ['col' => 'deliveryZone', 'order' => 'desc'];
        }
        return $out;
    }
}