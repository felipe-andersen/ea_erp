// lib/coupons.ts

'use client'
let coupons: Coupon[] = [];

export function addCoupon(coupon: Coupon) {
  coupons.push(coupon);
}

export function getAllCoupons(): Coupon[] {
  return coupons;
}

// types/coupon.ts
export type Coupon = {
  code: string;
  discountType: "percentage" | "fixed" | "free_shipping";
  value: number;
  appliesTo: string;
  expiresAt: string;
};


import { useState } from "react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Coupons() {
  const [coupons, setCoupons] = useState<Coupon[]>(getAllCoupons());
  const [form, setForm] = useState<Coupon>({
    code: "",
    discountType: "percentage",
    value: 0,
    appliesTo: "",
    expiresAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "value" ? parseFloat(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCoupon(form);
    setCoupons(getAllCoupons());
    alert("Cupom cadastrado com sucesso!");
    setForm({ ...form, code: "", value: 0 });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Cupons</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 mb-10 space-y-4">
        <div>
          <Label htmlFor="code">Código do Cupom</Label>
          <Input name="code" value={form.code} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="code">Nome/apelido</Label>
          <Input name="code" />
        </div>

        <div>
          <Label htmlFor="discountType">Tipo de Desconto</Label>
          <select
            name="discountType"
            value={form.discountType}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="percentage">Porcentagem (%)</option>
            <option value="fixed">Valor Fixo (R$)</option>
            <option value="free_shipping">Frete Grátis</option>
          </select>
        </div>

        {form.discountType !== "free_shipping" && (
          <div>
            <Label htmlFor="value">Valor</Label>
            <Input
              type="number"
              name="value"
              value={form.value}
              onChange={handleChange}
              required
              min={0}
              step="0.01"
            />
          </div>
        )}

        <div>
          <Label htmlFor="appliesTo">Categoria</Label>
          <Input name="appliesTo" value={form.appliesTo} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="expiresAt">Data de Expiração</Label>
          <Input
            type="date"
            name="expiresAt"
            value={form.expiresAt}
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className="w-full mt-4">
          Cadastrar Cupom
        </Button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Cupons Cadastrados</h2>
      {coupons.length === 0 ? (
        <p className="text-gray-500">Nenhum cupom cadastrado ainda.</p>
      ) : (
        <ul className="grid gap-4">
          {coupons.map((coupon, index) => (
            <li
              key={index}
              className="p-4 border rounded-lg bg-white shadow-sm flex flex-col gap-1"
            >
              <span className="font-bold">{coupon.code}</span>
              <span>
                {coupon.discountType === "percentage"
                  ? `${coupon.value}%`
                  : coupon.discountType === "fixed"
                  ? `R$ ${coupon.value.toFixed(2)}`
                  : "Frete Grátis"}
              </span>
              <span className="text-sm">Categoria: {coupon.appliesTo}</span>
              <span className="text-sm text-gray-500">Expira em: {coupon.expiresAt}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

