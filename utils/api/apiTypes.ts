export interface INftList {
  count: number;
  status: number;
  result: INftItem[];
}

export interface INftItem {
  chain_name: string;
  chain_id: number;
  contract_address: string;
  token_id: string;
  amount: string;
  contract_type: string;
}

export interface INftMetaItem {
  status: number;
  result: {
    chain_name: string;
    chain_id: number;
    contract_address: string;
    token_id: string;
    name: string;
    image_url: string;
    animation_url: string | null;
    contract_type: string;
    collection_name: string;
    collection_verified: boolean;
  };
}
export interface IActivityActionDict {
  name: string;
  decimals: number;
  value: number;
  quote_rate: number;
  logo_url: string;
  from_addr: string;
  from: string;
  to: string;
  symbol: string;
  amount: number;
  to_addr: string;
  token_id: string;
  tx_value: number;
}
export interface IActivityListFormatted {
  id: string;
  from: string;
  to: string;
  date: number;
  status: number;
  type: string;
  value: number;
  fee: number;
  chain: string;
  native_token_decimals: number;
  description: string;
  sent: IActivityActionDict[];
  received: IActivityActionDict[];
}

export interface INFTData {
  wallet_address: string;
  id: string;
  background_color: string;
  name: string;
  description: string;
  chain: string;
  image_url: string;
  content_type: string;
  content: string;
  amount: number;
  usd_price: number;
  traits: Array<{ trait_type: string; value: string }>;
  collection_id: string;
  contract_id: string;
  contract_name: string;
  total_supply: number;
  detail_url: string;
  isWatchList?: boolean;
  token_id?: string;
}
export interface ITokenList {
  count: number;
  status: number;
  result: ITokenItem[];
}

export interface ITokenItem {
  chain_name: string;
  chain_id: number;
  address: string;
  name: string;
  decimals: number;
  symbol: string;
  logo_url: string;
  actual_price: string;
  is_verified: boolean;
  is_stable: boolean;
  is_protocol_token: boolean;
  amount: string;
}

export interface IDefiList {
  count: number;
  status: number;
  result: IDefiItem[];
}

export interface IDefiItem {
  protocol_name: string;
  chain_id: number;
  protocol_id: string;
  protocol_logo: string | null;
  chain_name: string;
  position: {
    asset_usd_value: string;
    debt_usd_value: string;
    net_usd_value: string;
  };
}
