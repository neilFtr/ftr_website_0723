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










$file = file_get_contents('http://vps-7ed23343.vps.ovh.net/deribit/equity_floating_rate7.json');
file_put_contents('data_products/equity_floating_rate.json', $file);





$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_bucketted_datas_ob10.json');
file_put_contents('dataviz/data/bucketted_datas_ob.json', $file);


$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_timess_ob10.json');
file_put_contents('dataviz/data/timess_ob.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob10.json');
file_put_contents('dataviz/data/buckets_ob.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob_time10.json');
file_put_contents('dataviz/data/buckets_ob_time.json', $file);





$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_bucketted_datas_ob10.json');
file_put_contents('dataviz/data/bucketted_datas_ob_10_ftx.json', $file);


$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_timess_ob10.json');
file_put_contents('dataviz/data/timess_ob_10_ftx.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob10.json');
file_put_contents('dataviz/data/buckets_ob_10_ftx.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob_time10.json');
file_put_contents('dataviz/data/buckets_ob_time_10_ftx.json', $file);









$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_bucketted_datas_ob20.json');
file_put_contents('dataviz/data/bucketted_datas_ob_20_ftx.json', $file);

 
$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_timess_ob20.json');
file_put_contents('dataviz/data/timess_ob_20_ftx.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob20.json');
file_put_contents('dataviz/data/buckets_ob_20_ftx.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/ftx_buckets_ob_time20.json');
file_put_contents('dataviz/data/buckets_ob_time_20_ftx.json', $file);













$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/bucketted_datas_ob10.json');
file_put_contents('dataviz/data/bucketted_datas_ob_10_binance.json', $file);


$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/timess_ob10.json');
file_put_contents('dataviz/data/timess_ob_10_binance.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/buckets_ob10.json');
file_put_contents('dataviz/data/buckets_ob_10_binance.json', $file);

$file = file_get_contents('http://vps-7ed7a58e.vps.ovh.net/deribit/buckets_ob_time10.json');
file_put_contents('dataviz/data/buckets_ob_time_10_binance.json', $file);


































 


$file = file_get_contents('http://vps-7ed23343.vps.ovh.net/deribit/future_yields_aggregated.json');
file_put_contents('global_data/future_yields_aggregated.json', $file);

$file = file_get_contents('http://vps-7ed23343.vps.ovh.net/deribit/equity_fixed_rate_7.json');
file_put_contents('data_products/equity_fixed_ratex1.json', $file);






$file = file_get_contents('http://vps-7ed23343.vps.ovh.net/deribit/spread_alleged_lev.json');
file_put_contents('data_products/spread_alleged_lev.json', $file);







$file = file_get_contents('http://vps-7ed23343.vps.ovh.net/deribit/equity_anakin_7.json');
file_put_contents('data_products/equity_anakin_7.json', $file);




$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/onchain_orca_histo_3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh.json');
file_put_contents('alpha/data_products/onchain_orca_histo_3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/onchain_orca_histo_7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj.json');
file_put_contents('alpha/data_products/onchain_orca_histo_7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj.json', $file);

$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/onchain_orca_histo_RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a.json');
file_put_contents('alpha/data_products/onchain_orca_histo_RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a.json', $file);





$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/performance_3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh.json');
file_put_contents('alpha/data_products/performance_3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/performance_RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a.json');
file_put_contents('alpha/data_products/performance_RLBxxFkseAZ4RgJH3Sqn8jXxhmGoz9jWxDNJMh8pL7a.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/performance_7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj.json');
file_put_contents('alpha/data_products/performance_7dHbWXmci3dT8UFYWYZweBLXgycu7Y3iL6trKn1Y7ARj.json', $file);






$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/performance_7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs.json');
file_put_contents('alpha/data_products/performance_7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs.json', $file);

$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/onchain_orca_histo_7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs.json');
file_put_contents('alpha/data_products/onchain_orca_histo_7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs.json', $file);






$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/anakin_strat_perf.json');
file_put_contents('alpha/data_products/anakin_strat_perf.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/anakin_strat_histo.json');
file_put_contents('alpha/data_products/anakin_strat_histo.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/anakin_strat_perf.json');
file_put_contents('alpha/data_products/anakin_strat_perf.json', $file);

$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/anakin_drift_strat_perf.json');
file_put_contents('alpha/data_products/anakin_drift_strat_perf.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/anakin_drift_strat_histo.json');
file_put_contents('alpha/data_products/anakin_drift_strat_histo.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/zeta_drift_strat_histo.json');
file_put_contents('alpha/data_products/zeta_drift_strat_histo.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/zeta_drift_strat_perf.json');
file_put_contents('alpha/data_products/zeta_drift_strat_perf.json', $file);


$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/zeta_drift_strat_perf.json');
file_put_contents('alpha/data_products/zeta_drift_strat_perf.json', $file);

$file = file_get_contents('http://vps-c9903607.vps.ovh.ca/deribit/zeta_drift_strat_histo.json');
file_put_contents('alpha/data_products/zeta_drift_strat_histo.json', $file);















