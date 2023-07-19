<?php
class Daddy 
{
    function downloadFile($url, $path)
{
    $newfname = $path;
    $file = fopen ($url, 'rb');
    if ($file) {
        $newf = fopen ($newfname, 'wb');
        if ($newf) {
            while(!feof($file)) {
                fwrite($newf, fread($file, 1024 * 8), 1024 * 8);
            }
        }
    }
    if ($file) {
        fclose($file);
    }
    if ($newf) {
        fclose($newf);
    }
}

}

	 

$tt=new Daddy;


set_time_limit(0); 




$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/zeta_drift_strat_perf.json');
file_put_contents('alpha/data_products/zeta_drift_strat_perf.json', $file);















