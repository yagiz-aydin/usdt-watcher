import React, { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import { formatContract } from '@/lib/utils';
import { twMerge } from "tailwind-merge";

interface ContractValidatorProps {
  platforms?: { [key: string]: string };
  loading: boolean;
}

const EXPLORERS: { [key: string]: string } = {
  ethereum: 'https://etherscan.io/token/',
  'binance-smart-chain': 'https://bscscan.com/token/',
  solana: 'https://solscan.io/token/',
  tron: 'https://tronscan.org/#/token20/',
  polygon: 'https://polygonscan.com/token/',
  avalanche: 'https://snowtrace.io/token/',
};

const DISPLAY_NAMES: { [key: string]: string } = {
    ethereum: 'Ethereum (ERC20)',
    'binance-smart-chain': 'BNB Smart Chain (BEP20)',
    solana: 'Solana',
    tron: 'Tron (TRC20)',
    polygon: 'Polygon',
    avalanche: 'Avalanche',
}

export const ContractValidator: React.FC<ContractValidatorProps> = ({ platforms, loading }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('ethereum');
  const [copied, setCopied] = useState(false);

  const address = platforms ? platforms[selectedPlatform] : '';
  const formattedAddress = formatContract(address);
  
  const explorerUrl = EXPLORERS[selectedPlatform] 
    ? `${EXPLORERS[selectedPlatform]}${address}` 
    : `#`;

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const availablePlatforms = platforms ? Object.keys(platforms).filter(p => DISPLAY_NAMES[p] || EXPLORERS[p]) : [];
  // If platforms are loaded but our selected one isn't there, switch to first available
  if (!loading && platforms && !platforms[selectedPlatform] && availablePlatforms.length > 0) {
      setSelectedPlatform(availablePlatforms[0]);
  }


  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl mt-6">
      <h2 className="text-neutral-500 dark:text-neutral-400 text-sm font-medium mb-4 uppercase tracking-wider flex items-center gap-2">
        Contract Validator
        <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
            Official
        </span>
      </h2>

      {loading ? (
        <div className="space-y-4">
             <div className="h-10 w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
             <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 animate-pulse rounded" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(DISPLAY_NAMES).map((key) => {
                if (!platforms || !platforms[key]) return null;
                return (
                    <button
                        key={key}
                        onClick={() => setSelectedPlatform(key)}
                        className={twMerge(
                            "px-3 py-1.5 text-sm rounded-lg transition-colors border",
                            selectedPlatform === key
                                ? "bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-900 dark:border-white"
                                : "bg-transparent text-neutral-600 hover:bg-neutral-100 border-neutral-200 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:border-neutral-700"
                        )}
                    >
                        {DISPLAY_NAMES[key]}
                    </button>
                )
            })}
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-950 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="font-mono text-sm break-all">
                {typeof formattedAddress === 'string' ? (
                    <span>{formattedAddress}</span>
                ) : (
                    <>
                        <span className="text-neutral-500">{formattedAddress.start}...</span>
                        <span className="font-bold text-neutral-900 dark:text-white bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">
                            {formattedAddress.end}
                        </span>
                    </>
                )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
                 <button
                    onClick={handleCopy}
                    className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    title="Copy Address"
                 >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                 </button>
                 <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    title="View on Explorer"
                 >
                    <ExternalLink className="w-4 h-4" />
                 </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
