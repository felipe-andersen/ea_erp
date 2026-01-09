import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      customer,
      items,
      card,
      billingAddress,
    } = await req.json();

    const body = {
      reference_id: `order-${Date.now()}`,
      customer: {
        name: customer.name,
        email: customer.email,
        tax_id: customer.cpf,
        phones: [
          {
            country: "55",
            area: customer.phoneArea,
            number: customer.phoneNumber,
            type: "MOBILE",
          },
        ],
      },
      items: items.map((item: any) => ({
        name: item.name,
        quantity: item.quantity,
        unit_amount: item.price,
      })),
      charges: [
        {
          reference_id: `charge-${Date.now()}`,
          description: "Pagamento com cartão",
          amount: {
            value: items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0),
            currency: "BRL",
          },
          payment_method: {
            type: "CREDIT_CARD",
            installments: card.installments ?? 1,
            capture: true,
            card: {
              number: card.number,
              exp_month: card.exp_month,
              exp_year: card.exp_year,
              security_code: card.cvv,
              holder: {
                name: card.holderName,
              },
            },
          },
        },
      ],
      billing_address: {
        street: billingAddress.street,
        number: billingAddress.number,
        locality: billingAddress.neighborhood,
        city: billingAddress.city,
        region_code: billingAddress.state,
        country: "BRA",
        postal_code: billingAddress.zip,
      },
    };

    const response = await fetch(process.env.PAGBANK_BASE_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAGBANK_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data }, { status: 400 });
    }

    return NextResponse.json({
      status: "created",
      order: data,
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Erro ao processar pagamento" },
      { status: 500 }
    );
  }
}
